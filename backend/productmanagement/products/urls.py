from django.urls import path
from . import views

urlpatterns = [
    path('list-create/product/', views.ListCreateProduct.as_view(), name='list-create-product'),
    path('categorylist/', views.CategoryList.as_view(), name='get-categories-list'),
    path('category/<str:name>/<int:pk>/', views.CategoryManagment.as_view(), name='get-subcategory-product-list'),
    path('subcategoryproduct/<int:pk>/', views.SubCategoryManagment.as_view(), name='get-product-list')
]