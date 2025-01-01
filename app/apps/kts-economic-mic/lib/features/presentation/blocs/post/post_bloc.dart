import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:dio/dio.dart';
// import 'dart:convert';
import 'post_state.dart';

part 'post_event.dart';

final dio = Dio();

class PostBloc extends Bloc<PostEvent, PostState> {
  PostBloc() : super(PostInitial()) {
    on<InitialPosts>((event, emit) async {
      emit(PostLoading());
      try {
        final posts = await _fetchPosts();
        emit(PostLoaded(posts));
      } catch (e) {
        print(e);
        emit(PostError("Failed to fetch posts"));
      }
    });
  }

  Future<List<PostState>> _fetchPosts() async {
    final response =
        await dio.get('https://jsonplaceholder.typicode.com/posts');
    if (response.statusCode == 200) {
      // print(response.data);
      final List<dynamic> postJson = response.data;
      // return response.data.map((e) => PostState.fromJson(e)).toList();
      return postJson.map((json) => PostState.fromJson(json)).toList();
      // return null
    } else {
      throw Exception('Failed to load posts');
    }
  }
}
