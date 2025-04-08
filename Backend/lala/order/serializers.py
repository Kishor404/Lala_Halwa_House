from rest_framework import serializers
from .models import Order, OrderItem, Address, PaymentDetails, OrderStatus

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'zip']

class PaymentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = ['transaction_id', 'payment_method', 'amount', 'tax_amount', 'shipping_amount', 'status']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ['timestamp', 'status', 'description']

class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(many=True)
    shipping_address = AddressSerializer()
    billing_address = AddressSerializer()
    payment_details = PaymentDetailsSerializer()
    order_status = OrderStatusSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'created_at', 'updated_at', 'status',
            'total_price', 'order_date', 'products', 'payment_details',
            'shipping_address', 'billing_address', 'order_status'
        ]

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        shipping_data = validated_data.pop('shipping_address')
        billing_data = validated_data.pop('billing_address')
        payment_data = validated_data.pop('payment_details')
        status_data = validated_data.pop('order_status')

        shipping_address = Address.objects.create(**shipping_data)
        billing_address = Address.objects.create(**billing_data)
        payment_details = PaymentDetails.objects.create(**payment_data)

        order = Order.objects.create(
            shipping_address=shipping_address,
            billing_address=billing_address,
            payment_details=payment_details,
            **validated_data
        )

        total_price = 0
        for item in products_data:
            price = item['price']
            quantity = item['quantity']
            total_price += price * quantity
            OrderItem.objects.create(order=order, **item)

        for status in status_data:
            OrderStatus.objects.create(order=order, **status)

        order.total_price = total_price
        order.save()
        return order
