# Product-Management-Django-React

## Backend Part 
### Exposed API's

- <strong>API to get all categories -: </strong><br>
   <strong>URL</strong>-: https://products-masters.herokuapp.com/shop/categorylist/?format=api  <br>
   <strong>METHOD</strong> - GET

- <strong>API to get subcategories for a category-:</strong> <br>
   <strong>URL</strong>-: https://products-masters.herokuapp.com/shop/category/subcategory/<category_id>/   <br>
   <strong>METHOD</strong> - GET <br>
    Eg -: https://products-masters.herokuapp.com/shop/category/subcategory/1/

- <strong>API to get all products for a category-:</strong> <br>
   <strong>URL</strong>-: https://products-masters.herokuapp.com/shop/category/products/<category_id>/   <br>
   <strong>METHOD</strong> - GET <br>
    Eg -: https://products-masters.herokuapp.com/shop/category/products/1/
 
- <strong>API to get all products for a subcategory-:</strong> <br>
   <strong>URL</strong>-: https://products-masters.herokuapp.com/shop/subcategoryproduct/<subcategory_id>/   <br>
   <strong>METHOD</strong> - GET <br>
   Eg-: https://products-masters.herokuapp.com/shop/subcategoryproduct/1/

- <strong>API to post new product under existing subcategory and category-: </strong><br>
   <strong>URL</strong>-: https://products-masters.herokuapp.com/shop/list-create/product/ <br> 
   <strong>METHOD</strong> - POST  <br>
   <strong>Body</strong>-: {name: name_of_the_product, sub_ctg_id-: subcategory_id}
       
## Frontend Part
 The frontend part is build using ReactJS.
 
## Hosting-:
- https://products-masters.herokuapp.com/ -: Backend Part
- https://young-sea-60130.herokuapp.com/ -: Frontend Part

## Running project on local-:
1) Go inside the frontend directory and run npm install and then npm start. 
2) Go inside the backend directory and run pi
    2.1) pip3 install -r requirements.txt
    2.2) python3 manage.py runserver
3) Then visit http://localhost:3000/ -: You will see the frontend running.
