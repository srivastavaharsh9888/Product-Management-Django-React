from rest_framework import serializers

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        fields = self.context['view'].kwargs['name']
        if fields and fields in self.fields:
            fields = 'products' if fields == 'subcategory' else 'subcategory'
            self.fields.pop(fields)
        else:
            self.fields.clear()
