import 'package:dartz/dartz.dart';

import 'package:mobile_3em/core/errors/failures.dart';
import 'package:mobile_3em/features/data/datasources/local/message_local_datasource.dart';
import 'package:mobile_3em/features/domain/entities/counter_entitiy.dart';

abstract class CounterRepository {
  Future<Either<Failure, CounterEntitiy>> getCounter(String counterId);
}

class CounterRepositoryImpl implements CounterRepository {
  final MessageLocalDataSource messageLocalDataSource;

  CounterRepositoryImpl({
    required this.messageLocalDataSource,
  });

  @override
  Future<Either<Failure, CounterEntitiy>> getCounter(String messageId) async {
    try {
      CounterEntitiy counterEntitiy = const CounterEntitiy(counter: 2, status: CounterStatus.success);
      return Right(counterEntitiy);
    } catch (e) {
      return Left(DatabaseFailure());
    }
  }
}
