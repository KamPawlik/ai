from rest_framework import serializers

from .models import Rate

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ('id', 'name', 'description')
        read_only_fields = ('id',)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
