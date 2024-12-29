import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'post_state.g.dart';

class PostInitial extends PostState {}

class PostLoading extends PostState {}

class PostLoaded extends PostState {
  final List<PostState> posts;
  PostLoaded(this.posts);
}

class PostError extends PostState {
  final String message;
  PostError(this.message);
}


@JsonSerializable(explicitToJson: true)
class PostState extends Equatable{
  const PostState({this.id = 0, this.title = '', this.body = ''});

  final int id;
  final String title;
  final String body;

  PostState copyWith({int? id, String? title, String? body}) => PostState(
        id: id ?? this.id,
        title: title ?? this.title,
        body: body ?? this.body
      );

  @override
  List<Object?> get props => [id, title];

  factory PostState.fromJson(Map<String, dynamic> json) => _$PostStateFromJson(json);

  Map<String, dynamic> toJson() => _$PostStateToJson(this);
}
