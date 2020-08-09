import React from 'react';
import { Button, Select, Input, Alert } from 'antd';
const Option = Select.Option;

export const makeSelectOptionBox = (defaultValue, options, callback) => {
    return ( 
      <Select
        defaultValue={defaultValue}
        onChange={callback}
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options}
      </Select>
    )
};

export const createOptionForDropdown = (createOption, category, selectCallBackFunction, defaultValue="") => {

    if(createOption === "category") {
      let categoryOption = Object.values(category).map( ctg => <Option key={ctg.id} value={ctg.id} >{ctg.name}</Option>)      
      return (makeSelectOptionBox(defaultValue, categoryOption, selectCallBackFunction));
    }

    let subcategoryOption = Object.values(category).map( ctg =>
              ctg.subcategory.map (sub_ctg => <Option key={sub_ctg.id} value={sub_ctg.id} >{sub_ctg.name}</Option>))      
    return (makeSelectOptionBox(defaultValue, subcategoryOption, selectCallBackFunction));

};

