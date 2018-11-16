from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response


from . import serializers
from . import models


# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class FiltersListViewSet(viewsets.ViewSet):
    serializer_class = serializers.ClientReturnedFiltersSerializer

    def list(self, request):
        return Response(self.serializer_class([]).data)


class DormViewSet(viewsets.ViewSet):
    serializer_class = serializers.DormSerializer

    def list(self, request):

        deserialized_filters = serializers.ClientAcceptedFiltersSerializer(data=request.data)
        deserialized_filters.is_valid()

        print('qooq')

        filtered_dorms = models.Dormitory.objects\
            .superfilter(
                category_id=deserialized_filters.data.get(
                    'category_selected_option_id', None),
                academic_year_option_id=deserialized_filters.data.get(
                    'academic_year_option_id', None),
                dorm_features_ids=deserialized_filters.data.get(
                    'dorm_features', None),
                radio_integeral_choices=deserialized_filters.data.get(
                    'additional_filters', None),
                room_features_ids=deserialized_filters.data.get(
                    'room_features', None))

        print(filtered_dorms)

        return Response(self.serializer_class(filtered_dorms, many=True).data)
