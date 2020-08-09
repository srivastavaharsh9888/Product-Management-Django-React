from rest_framework import generics

from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer,\
                         CategoryListSerializer
from .models import Products, Categories, SubCategories

class ListCreateProduct(generics.ListCreateAPIView):
    """Insert a new product and return the list of products."""

    serializer_class = ProductSerializer
    queryset = Products.objects.all().select_related('sub_ctg_id', 'sub_ctg_id__ctg_id')

class CategoryManagment(generics.RetrieveAPIView):
    """ Return subcategory list or product list for a category."""

    queryset = Categories.objects.all().prefetch_related('subcategory')
    serializer_class = CategorySerializer

class SubCategoryManagment(generics.RetrieveAPIView):
    """Return the list of product for sub-categories."""

    serializer_class = SubCategorySerializer
    queryset = SubCategories.objects.all().prefetch_related('products')

class CategoryList(generics.ListAPIView):
    """Return the list of categories."""

    queryset = Categories.objects.all()
    serializer_class = CategoryListSerializer
