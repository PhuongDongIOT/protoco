import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_3em/features/domain/usecases/counter_usecase.dart';

part 'counter_event.dart';
part 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  final GetAllGroupsLocalUseCase getAllGroupsLocalUseCase;
  CounterBloc({ required this.getAllGroupsLocalUseCase}) : super(const CounterState()) {
    on<ResetEvent>(existCounterLocalEvent);
    on<IncrementEvent>(_onCounterIncrementd);
    on<DecrementEvent>(_onCounterDecrementd);
  }

   Future<void> existCounterLocalEvent(event, emit) async {
    try{
      final counterId = event.counterId;
      final function = await getAllGroupsLocalUseCase.call(ParamsGetCounter(counterId: counterId));
      print(function);
      function.fold(
        (failure) {
          emit(_onCounterIncrementd);
        },
        (data) {
          emit(_onCounterDecrementd);
        }
      );
    } catch(e) {
      emit(_onCounterDecrementd);
    }
  }

  Future<void> _onCounterIncrementd(
    IncrementEvent event,
    Emitter<CounterState> emit,
  ) async {
    emit(state.copyWith(status: CounterStatus.loading));
    // await Future.delayed(const Duration(seconds: 1));
    emit(
      state.copyWith(
        status: CounterStatus.success,
        counter: state.counter + 1,
      ),
    );
  }

  Future<void> _onCounterDecrementd(
    DecrementEvent event,
    Emitter<CounterState> emit,
  ) async {
    emit(state.copyWith(status: CounterStatus.loading));
    // await Future.delayed(const Duration(seconds: 1));
    emit(
      state.copyWith(
        status: CounterStatus.success,
        counter: state.counter - 1,
      ),
    );
  }
}