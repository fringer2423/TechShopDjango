from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['_id', 'name', 'brand', 'category', 'price', 'get_img']
    list_display_links = ['name']
    list_editable = ['price']
    readonly_fields = ['get_img', 'createdAt']
    fields = ['user', 'name', 'brand', 'category', 'image', 'get_img', 'description', 'rating', 'numReviews', 'price',
              'countInStock', 'createdAt']

    def get_img(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="80px">')
        else:
            return "Нет картинки"

    get_img.short_description = 'Миниатюра'


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['_id', 'user', 'name', 'product', 'rating', 'createdAt']
    list_display_links = ['name']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['_id', 'user', 'isPaid', 'isDelivered', 'createdAt']
    list_display_links = ['_id']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['_id', 'name', 'order', 'product', 'qty', 'price']
    list_display_links = ['name']


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['_id', 'order', 'address', 'city', 'country']
    list_display_links = ['_id']
