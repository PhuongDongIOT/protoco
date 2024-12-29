import 'package:equatable/equatable.dart';
// import 'package:objectbox/objectbox.dart';

enum CounterStatus { initial, loading, success, failure }

// @Entity()
class CounterEntitiy extends Equatable {
  const CounterEntitiy({
    this.counter = 0,
    this.status = CounterStatus.initial,
  });

  final int counter;
  final CounterStatus status;

  @override
  List<Object?> get props => [counter, status];
}
