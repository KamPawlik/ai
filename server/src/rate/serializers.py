from rest_framework import serializers

from .models import Rate
from .generator import calculate_house_price

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ('id', 'name', 'description', 'floor', 'rooms', 'sq', 'year', 'price')
        read_only_fields = ('id', 'price')

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        house = {
            "floor": validated_data["floor"],
            "rooms": validated_data["rooms"],
            "sq": validated_data["sq"],
            "year": validated_data["year"],
        }
        validated_data["price"] = calculate_house_price(house)
        return super().create(validated_data)
