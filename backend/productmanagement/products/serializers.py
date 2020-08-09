from rest_framework import serializers
from products.models import Products, Categories, SubCategories
from .serializer_utils import DynamicFieldsModelSerializer

class SubCategorySerializer(serializers.ModelSerializer):
    products = serializers.StringRelatedField(many=True)
    category_name = serializers.ReadOnlyField(source='ctg_id.name', read_only=True)
    
    class Meta:
        model = SubCategories
        fields = ['id', 'name', 'products', 'category_name']

class ProductSerializer(serializers.ModelSerializer):
    sub_ctg_name = serializers.CharField(source='sub_ctg_id', read_only=True)
    ctg_id = serializers.CharField(source='sub_ctg_id.ctg_id.id', read_only=True)
    ctg_name = serializers.CharField(source='sub_ctg_id.ctg_id', read_only=True)

    class Meta:
        model = Products
        fields = '__all__'
    
class CategorySerializer(DynamicFieldsModelSerializer):
    products = serializers.SerializerMethodField()
    subcategory = serializers.SerializerMethodField()
    
    class Meta:
        model = Categories
        fields = ['id', 'name', 'subcategory', 'products']

    def get_products(self, obj):
        category_id = self.context['view'].kwargs['pk']
        return Products.objects.filter(sub_ctg_id__ctg_id__pk=category_id)\
                               .values('id', 'name', 'sub_ctg_id__name')

    def get_subcategory(self, obj):
        return obj.subcategory.all().values('id', 'name')

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
