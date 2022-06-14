from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    _id = models.BigAutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Пользователь')
    name = models.CharField(max_length=200, null=True, blank=True, verbose_name='Название')
    image = models.ImageField(null=True, blank=True, verbose_name='Изображение')
    brand = models.CharField(max_length=200, null=True, blank=True, verbose_name='Бренд')
    category = models.CharField(max_length=200, null=True, blank=True, verbose_name='Категория')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Рейтинг')
    numReviews = models.IntegerField(null=True, blank=True, default=0, verbose_name='Количество отзывов')
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Стоимость')
    countInStock = models.IntegerField(null=True, blank=True, default=0, verbose_name='Остаток')
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    def __str__(self):
        return self.name


class Review(models.Model):
    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    _id = models.BigAutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Пользователь')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Продукт')
    name = models.CharField(max_length=200, null=True, blank=True, verbose_name='Название')
    rating = models.IntegerField(null=True, blank=True, default=0, verbose_name='Рейтинг')
    comment = models.TextField(null=True, blank=True, verbose_name='Комментарий')
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return f"Отзыв {self._id} {self.name}"


class Order(models.Model):
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    _id = models.BigAutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Пользователь')
    paymentMethod = models.CharField(max_length=200, null=True, blank=True, verbose_name='Способ оплаты')
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Налог')
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,
                                        verbose_name='Стоимость доставки')
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,
                                     verbose_name='Итоговая цена')
    isPaid = models.BooleanField(default=False, verbose_name='Оплачено')
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True, verbose_name='Дата оплаты')
    isDelivered = models.BooleanField(default=False, verbose_name='Статус доставки')
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True, verbose_name='Дата доставки')
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return f"Заказ {self._id} от {self.createdAt}"


class OrderItem(models.Model):
    class Meta:
        verbose_name = 'Товар в заказе'
        verbose_name_plural = 'Товары в заказе'

    _id = models.BigAutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Товар')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, verbose_name='Заказ')
    name = models.CharField(max_length=200, null=True, blank=True, verbose_name='Название')
    qty = models.IntegerField(null=True, blank=True, default=0, verbose_name='Количество')
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Стоимость')
    image = models.CharField(max_length=200, null=True, blank=True, verbose_name='Изображение')

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    class Meta:
        verbose_name = 'Адрес доставки'
        verbose_name_plural = 'Адреса доставки'

    _id = models.BigAutoField(primary_key=True, editable=False)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Заказ')
    address = models.CharField(max_length=200, null=True, blank=True, verbose_name='Адрес')
    city = models.CharField(max_length=200, null=True, blank=True, verbose_name='Город')
    postalCode = models.CharField(max_length=200, null=True, blank=True, verbose_name='Индекс')
    country = models.CharField(max_length=200, null=True, blank=True, verbose_name='Регион')
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,
                                        verbose_name='Стоимость доставки')

    def __str__(self):
        return self.address
