export const product_list_columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_ctg_name',
      key: 'sub_ctg_name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Category',
      dataIndex: 'ctg_name',
      key: 'ctg_name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ];