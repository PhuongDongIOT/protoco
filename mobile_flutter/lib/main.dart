import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile_3em/features/presentation/blocs/counter/counter_bloc.dart';
import 'package:mobile_3em/features/presentation/providers/directionality_provider.dart';
import 'package:mobile_3em/features/presentation/screens/counter_page.dart';
import 'package:provider/provider.dart';
import 'injection_container.dart';
import 'package:mobile_3em/app.dart';
import 'package:mobile_3em/my_bloc_observer.dart';
// import 'package:provider/provider.dart';

// App Theme is Light
bool isDark = false;
// App Direction is left to right
bool isLtr = true;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initLocator();

  Bloc.observer = const MyBlocObserver();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider<CounterBloc>(
              create: (context) => locator<CounterBloc>()),
        ],
        child: MultiProvider(
            providers: [
              ChangeNotifierProvider(create: (_) => DirectionalityProvider()),
            ],
            child: Builder(builder: (context) {
              return ChangeNotifierProvider<DirectionalityProvider>(
                  create: (_) => DirectionalityProvider(),
                  child: Consumer<DirectionalityProvider>(
                      builder: (context, directionalityProvider, child) {
                    return Directionality(
                        textDirection: directionalityProvider.direction,
                        child: MaterialApp(
                          debugShowCheckedModeBanner: false,
                          // theme: themeState.themeData,
                          home: Directionality(
                            textDirection: directionalityProvider.direction,
                            child: CounterView(),
                          ),
                        ));
                  }));
            })));
  }
}
