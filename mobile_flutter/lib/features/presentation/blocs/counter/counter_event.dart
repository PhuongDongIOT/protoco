part of 'counter_bloc.dart';

abstract class CounterEvent extends Equatable {
  const CounterEvent();

  @override
  List<Object?> get props => [];
}

class ResetEvent extends CounterEvent {
  final String counterId;
  const ResetEvent(this.counterId);

  @override
  List<Object> get props => [counterId];
}

class IncrementEvent extends CounterEvent {
  const IncrementEvent();
}

class DecrementEvent extends CounterEvent {
  const DecrementEvent();
}
