import grpc
from concurrent import futures
import location_pb2
import location_pb2_grpc

class LocationService(location_pb2_grpc.LocationServiceServicer):
    def GetLocation(self, request, context):
        return location_pb2.LocationResponse(
            id=request.id,
            name=f"Location {request.id}",
            latitude=40.7128,
            longitude=-74.0060
        )

    def ListLocations(self, request, context):
        return location_pb2.LocationListResponse(
            locations=[
                location_pb2.LocationResponse(
                    id="1", name="New York", latitude=40.7128, longitude=-74.0060
                ),
                location_pb2.LocationResponse(
                    id="2", name="Los Angeles", latitude=34.0522, longitude=-118.2437
                )
            ]
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    location_pb2_grpc.add_LocationServiceServicer_to_server(LocationService(), server)
    server.add_insecure_port("[::]:5000")
    print("gRPC server running on port 5000")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
