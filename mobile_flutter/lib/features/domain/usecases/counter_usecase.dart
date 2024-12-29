import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:mobile_3em/core/errors/failures.dart';
import 'package:mobile_3em/core/usecase/usecase.dart';
import 'package:mobile_3em/features/domain/entities/counter_entitiy.dart';
import 'package:mobile_3em/features/domain/repositories/counter_repository.dart';

class GetAllGroupsLocalUseCase implements UseCase<CounterEntitiy, ParamsGetCounter> {
  final CounterRepository repository;
  GetAllGroupsLocalUseCase(this.repository);

  @override
  Future<Either<Failure, CounterEntitiy>> call(ParamsGetCounter params) async {
    return await repository.getCounter(params.counterId);
  }
}

class ParamsGetCounter extends Equatable {
  final String counterId;
  const ParamsGetCounter({required this.counterId});

  @override
  List<Object> get props => [counterId];

  @override
  String toString() {
    return 'GetGroupMessageTypeLocalUseCase Params{messageId: $counterId}';
  }
}