import 'package:flutter/material.dart';

final myController = TextEditingController();

class TextFieldCustom extends StatefulWidget {
  const TextFieldCustom({super.key, required this.textString});
  final String textString;

  @override
  State<TextFieldCustom> createState() => _TextFieldCustomState();
}

class _TextFieldCustomState extends State<TextFieldCustom> {
  // _TextFieldCustomState({required this.textString});
  // final String textString;
  TextEditingController TextController = new TextEditingController(text: '');

  @override
  void initState() {
    super.initState();
    TextController = new TextEditingController(text: 'Initial value');
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: TextController,
      // validator: (value) {
      //   if (value == null || value.isEmpty) {
      //     return 'Please enter some text';
      //   }
      //   return null;
      // },
    );
  }
}
