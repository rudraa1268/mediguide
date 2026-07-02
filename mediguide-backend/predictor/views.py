from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .ml_engine import predict_from_text, UnknownSymptomError, symptoms_dict


@api_view(['POST'])
def predict(request):
    symptoms = request.data.get('symptoms', '').strip()

    if not symptoms:
        return Response(
            {'error': 'Please enter at least one symptom.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        result = predict_from_text(symptoms)
    except UnknownSymptomError as e:
        return Response(
            {'error': f"Symptom(s) not recognized: {', '.join(e.bad_symptoms)}. "
                       f"Please check spelling and use underscores (e.g. skin_rash)."},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': 'Something went wrong while predicting. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def symptom_list(request):
    """Handy endpoint so the frontend can offer autocomplete/valid symptom names."""
    return Response({'symptoms': sorted(symptoms_dict.keys())})
