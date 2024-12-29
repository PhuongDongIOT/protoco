import 'package:mobile_3em/features/domain/entities/counter_entitiy.dart';
import 'package:mobile_3em/features/domain/usecases/counter_usecase.dart';
import 'package:mobile_3em/features/presentation/blocs/counter/counter_bloc.dart';
import 'package:rxdart/rxdart.dart';

class CounterRxDart {
  final GetAllGroupsLocalUseCase getAllGroupsLocalUseCase;

  CounterRxDart({required this.getAllGroupsLocalUseCase});

  final _existLocal = PublishSubject<CounterEntitiy>();
  Stream<CounterEntitiy> get existLocal => _existLocal.stream;

  final _counterLocal = PublishSubject<List<CounterEntitiy>>();
  Stream<List<CounterEntitiy>> get counterLocal => _counterLocal.stream;

  void dispose() async {
    await _existLocal.drain(0);
    //
    _existLocal.close();
  }

  Future<void> existMessageLocal(String counterId) async {
    try {
      final function = await getAllGroupsLocalUseCase
          .call(ParamsGetCounter(counterId: counterId));
      const DecrementEvent();
      function.fold((failure) {
        _existLocal.sink.addError('hihi');
      }, (data) {
        const DecrementEvent();
        _existLocal.sink.add(data);
        _counterLocal.sink.add([data, data, data, data]);
      });
    } catch (e) {
      _existLocal.sink.addError(e.toString());
    }
  }

  Future<void> getMessageLocal(String counterId) async {
    try {
      final function = await getAllGroupsLocalUseCase
          .call(ParamsGetCounter(counterId: counterId));
      function.fold((failure) {
        _existLocal.sink.addError('hihi');
      }, (data) {
        _existLocal.sink.add(data);
      });
    } catch (e) {
      _existLocal.sink.addError(e.toString());
    }
  }

    Future<void> getMessageLocalVal(List<CounterEntitiy> counter) async {
    try {
      _counterLocal.sink.add(counter);
    } catch (e) {
      _counterLocal.sink.addError(e.toString());
    }
  }
}
