import 'package:get_it/get_it.dart';
import 'package:mobile_3em/features/data/datasources/local/message_local_datasource.dart';
import 'package:mobile_3em/features/domain/repositories/counter_repository.dart';
import 'package:mobile_3em/features/domain/usecases/counter_usecase.dart';
// import 'package:mobile_3em/features/domain/usecases/counter_usecase.dart';
import 'package:mobile_3em/features/presentation/blocs/counter/counter_bloc.dart';
import 'package:mobile_3em/features/presentation/rx_dart/counter_rx_dart.dart';

final locator = GetIt.instance;

Future<void> initLocator() async {
  locator.registerFactory(() => CounterBloc(
        getAllGroupsLocalUseCase: locator(),
      ));

  locator.registerFactory(
    () => CounterRxDart(
      getAllGroupsLocalUseCase: locator(),
    ),
  );

  locator.registerLazySingleton<GetAllGroupsLocalUseCase>(
      () => GetAllGroupsLocalUseCase(locator()));

  locator.registerLazySingleton<MessageLocalDataSource>(
      () => MessageLocalDataSourceImpl());

  locator.registerLazySingleton<CounterRepository>(
    () => CounterRepositoryImpl(messageLocalDataSource: locator()),
  );
}
