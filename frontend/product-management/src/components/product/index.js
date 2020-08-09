import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../../utils/urlFor';
import { Table } from 'antd';
import { product_list_columns } from '../../constant/table_columns_product';
import ButtonCreateProduct from './button_product';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [], 
      loading: false,
      data: [],
      category: {},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  setStateData = (data) => this.setState({ ...data });

  fetch = () => {
    this.setState({ loading: true });
    axios.get(urlFor('list-create/product/'))
      .then(res => {
        this.setState(
          { 
            data: res.data,
            loading: false
          });
      })
      .catch(err => {
        console.log(err);
        alert("Please Reload The Page")
      })
  };

  render() {
    const { selectedRowKeys,data,loading,category } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <ButtonCreateProduct setStateData={this.setStateData} category={category} data={data}/>
        <Table 
          rowSelection={rowSelection} 
          columns={product_list_columns}
          dataSource={data}
          loading={loading}
          size="small"
          bordered
          rowKey="id" 
          pagination={{
            total: data.length,
            pageSize: data.length,
            hideOnSinglePage: true
          }}
          scroll={{
            y:500
          }}          
        />
      </div>
    );
  }
}

export default Product;