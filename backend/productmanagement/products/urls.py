from django.urls import include, path
from . import views
from django.conf import settings

urlpatterns = [
    path('listcreateproduct/', views.ProductManagement.as_view(), name='create-list-product'),
    path('categorylist/', views.CategoryList.as_view(), name='get-categories-list'),
    path('category/<str:name>/<int:pk>/', views.CategoryManagment.as_view(), name='get-subcategory-product-list'),
    path('subcategoryproduct/<int:pk>/', views.SubCategoryManagment.as_view(), name='get-product-list')
]