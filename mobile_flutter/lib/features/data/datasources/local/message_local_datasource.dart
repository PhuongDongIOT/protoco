import 'package:mobile_3em/core/errors/exceptions.dart';

abstract class MessageLocalDataSource {
  Future<bool> getAllMessagesLocal(String messageId);
}

class MessageLocalDataSourceImpl implements MessageLocalDataSource {
  
  MessageLocalDataSourceImpl();
  
  @override
  Future<bool> getAllMessagesLocal(String messageId) async {
    try {
      return true;
    } catch (e) {
      throw DatabaseException();
    }
  }
}
