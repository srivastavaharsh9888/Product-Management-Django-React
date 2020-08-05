from django.db import models

class Categories(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class SubCategories(models.Model):
    name = models.CharField(max_length=200)
    ctg_id = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='subcategory')

    def __str__(self):
        return self.name

class Products(models.Model):
    name = models.CharField(max_length=200)
    sub_ctg_id = models.ForeignKey(SubCategories, on_delete=models.CASCADE,
                                   related_name='products')

    def __str__(self):
        return self.name
