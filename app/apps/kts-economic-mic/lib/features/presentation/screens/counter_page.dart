import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_3em/features/domain/entities/counter_entitiy.dart';
import 'package:mobile_3em/features/presentation/blocs/counter/counter_bloc.dart';
import 'package:mobile_3em/features/presentation/rx_dart/counter_rx_dart.dart';
import 'package:mobile_3em/injection_container.dart';

/// {@template counter_view}
/// A [StatelessWidget] which reacts to the provided
/// [CounterCubit] state and notifies it in response to user input.
/// {@endtemplate}
class CounterView extends StatelessWidget {
  /// {@macro counter_view}
  // const CounterView({super.key});
  final CounterRxDart counterRxDart = locator();
  int messageId = 1;
  @override
  Widget build(BuildContext context) {
    // final textTheme = Theme.of(context).textTheme;
    return Scaffold(
      body: Center(
        child:
            BlocBuilder<CounterBloc, CounterState>(builder: (context, state) {
          // switch (state.status) {
          //   case CounterStatus.success:
          return Column(
            children: [
              Text('${state.counter}'),
              SizedBox(
                  height: 300,
                  width: 400,
                  child: FutureBuilder(
                      future: _messageListBody(),
                      builder: (context, snapshot) {
                        if (snapshot.hasData) {
                          return snapshot.data!;
                        }
                        return const Center(child: CircularProgressIndicator());
                      }))
            ],
          );
          // case CounterStatus.loading:
          //   return const CircularProgressIndicator.adaptive();
          // case CounterStatus.failure:
          //   return const Text('Something went wrong');
          // default:
          //   return const Text('0');
          // }
        }),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: <Widget>[
          FloatingActionButton(
              key: const Key('counterView_increment_floatingActionButton'),
              child: const Icon(Icons.add),
              onPressed: () async {
                await counterRxDart.existMessageLocal('hihi');
              }),
          const SizedBox(height: 8),
          FloatingActionButton(
            key: const Key('counterView_decrement_floatingActionButton'),
            child: const Icon(Icons.remove),
            onPressed: () => context.read<CounterBloc>().add(
                  const DecrementEvent(),
                ),
          ),
        ],
      ),
    );
  }

  Future<Widget> _messageListBody() async {
    counterRxDart.getMessageLocal('1');
    return StreamBuilder<List<CounterEntitiy>>(
        stream: counterRxDart.counterLocal,
        builder: (BuildContext context,
            AsyncSnapshot<List<CounterEntitiy>> snapshot) {
          var data = snapshot.data;
          var length = snapshot.data?.length;
          if (snapshot.hasError) {
            return const Text("Error");
          } else if (snapshot.hasData && snapshot.data!.isNotEmpty) {
            messageId = data!.length + 1;
            return ListView.builder(
              padding: const EdgeInsets.only(top: 100, bottom: 15),
              // physics: const BouncingScrollPhysics(),
              // reverse: true,
              itemCount: length,
              itemBuilder: (__, index) {
                final itemText = data.toList()[index].counter;
                return ListTile(title: Text("$itemText"));
              },
            );
            // } else if(snapshot.hasData && snapshot.data!.isEmpty) {
          }
          return const Center(child: CircularProgressIndicator());
        });
  }
}
