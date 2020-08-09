import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../../utils/urlFor';
import { Button, Input, Alert } from 'antd';
import { set, find, findIndex, last, isEmpty, isNumber } from 'lodash';
import { createOptionForDropdown } from './../component-helpers/product-helpers';

class ButtonCreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      product_addition: true,
      selected_sub_ctg_id: null,
      selected_ctg_id: null,
      product_name: "",
      alert : {
        alertType: "",
        alertMessage: ""
      }
    };
    this.onSubCategorySelection = this.onSubCategorySelection.bind(this);
    this.onCategorySelection = this.onCategorySelection.bind(this);
  }

  componentDidMount() {
    this.setCategory();
  };

  prepareLastRow = (last_row) => {
    last_row['id'] = last_row['id'] - 1;
    const data = [...this.props.data]
    data[data.length-1]=last_row
    this.props.setStateData({data: data})
  };

  onSubCategorySelection(value) {
    let category_to_be_selected = find(this.props.category, (o) => findIndex(o.subcategory, ['id',value])!==-1);
    this.setState({selected_sub_ctg_id: value});
    if(category_to_be_selected.id !== this.state.selected_ctg_id) {
      const last_row = last(this.props.data);
      last_row['ctg_name'] = createOptionForDropdown("category", this.props.category, this.onCategorySelection, category_to_be_selected.name);
      last_row['sub_ctg_name'] = createOptionForDropdown("subcategory", this.props.category, this.onSubCategorySelection, find(category_to_be_selected.subcategory, {'id': value}).name);
      this.prepareLastRow(last_row);
      this.setState({selected_ctg_id: category_to_be_selected.id})
    }
  };
  
  onCategorySelection(value) {
    this.setState({selected_ctg_id: value})
    let category_to_be_selected = isNumber(this.state.selected_sub_ctg_id) ? 
                                find(this.props.category, (o) => findIndex(o.subcategory, ['id',this.state.selected_sub_ctg_id])!==-1) :
                                this.props.category[value];
    if (category_to_be_selected.id === value && isNumber(this.state.selected_sub_ctg_id))
      return;
    let subcategory_to_selected = isEmpty(this.props.category[value].subcategory) ?
                                   [{name: "Select a sub category", id: null}] : this.props.category[value].subcategory;  
    const last_row = last(this.props.data);
    last_row['sub_ctg_name'] = createOptionForDropdown("subcategory", this.props.category, this.onSubCategorySelection, subcategory_to_selected[0].name);
    last_row['ctg_name'] = createOptionForDropdown("category", this.props.category, this.onCategorySelection, this.props.category[value].name);
    this.prepareLastRow(last_row);
    this.setState({selectsed_sub_ctg_id: subcategory_to_selected[0].id})
  };

  setCategory = async () => {
    axios.get(urlFor('categorylist/'))
      .then(res => {
        let category = {};
        res.data.forEach(ctg=> {
          set(category, `${ctg.id}`, {...ctg, subcategory: []});
        });
        for(let key in category) {
          axios.get(urlFor(`category/subcategory/${key}`))
          .then(res => {
            set(category, `${res.data.id}.subcategory`, res.data.subcategory);
            this.props.setStateData({category: category});
          });
        }
      });
  };

  setProductName = (event) => {
    const last_row = last(this.props.data);
    last_row['name'] = <Input placeholder="Enter product Name" defaultValue={event.target.value} onChange={this.setProductName} autoFocus required/>;
    this.setState({product_name: event.target.value});
    this.prepareLastRow(last_row);
  }

  handleChange = () => {
    const category_options = createOptionForDropdown("category", this.props.category, this.onCategorySelection, "Select a category");
    const subcategory_options = createOptionForDropdown("subcategory", this.props.category, this.onSubCategorySelection, "Select a Subcategory");
    this.setState({ product_addition: false });
    this.props.setStateData({
                data : [...this.props.data, 
                        {
                          id: -1, name: <Input placeholder="Enter product Name" value={this.state.product_name} onChange={this.setProductName} autoFocus required/>,
                          sub_ctg_name: subcategory_options, ctg_name: category_options
                        }
                      ]
                });
  }

  onAlertBoxClose = (e) => this.setState({alert:{alertType: "", alertMessage: ""}});
  
  saveProduct = () => {
    if (!this.state.product_name || !this.state.selected_sub_ctg_id)
    {
      this.setState({alert: {alertType : "warning", alertMessage: "Product Name and Subcategory cannot be empty"} });
      return;
    }
    axios.post(urlFor('list-create/product/'), {
        name: this.state.product_name, 
        sub_ctg_id: this.state.selected_sub_ctg_id
      })
      .then(res => {
        const data = this.props.data.slice(0,this.props.data.length-1);
        data.push(res.data);
        this.setState({
            "product_addition": true,
             alert: {alertType : "success", alertMessage: "Product is added to the list."},
            product_name:"", selected_sub_ctg_id: null
        });
        this.props.setStateData(
          { 
            data: data
          });
      })
      .catch(err => {
        console.log(err);
        alert("Please Reload The Page")
      })
  };

  render() {
    return (
      <div>
        {!isEmpty(this.state.alert.alertMessage) ?
             <Alert
                message={this.state.alert.alertMessage}
                type={this.state.alert.alertType}
                closable
                onClose={this.onAlertBoxClose} 
              /> :
             null
        }
        {this.state.product_addition ?
          <Button type="primary" onClick={this.handleChange}>Add Product</Button> :
          <Button type="primary" onClick={this.saveProduct}>Save Product</Button> 
        }
      </div>
    );
  }
}

export default ButtonCreateProduct;