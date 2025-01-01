// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post_state.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PostState _$PostStateFromJson(Map<String, dynamic> json) => PostState(
      id: (json['id'] as num?)?.toInt() ?? 0,
      title: json['title'] as String? ?? "",
      body: json['body'] as String? ?? "",
    );

Map<String, dynamic> _$PostStateToJson(PostState instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'body': instance.body,
    };
