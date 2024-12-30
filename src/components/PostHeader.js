import React from 'react';
import { View, Text, Image } from 'react-native';
import PostHeaderStyles from '../styles/Chat/PostHeaderStyles';

const PostHeader = ({ post }) => {
    return (
        <View style={PostHeaderStyles.postDetails}>
            <Image source={{ uri: post.image }} style={PostHeaderStyles.postImage} />
            <View>
                <Text style={PostHeaderStyles.postTitle}>{post.title}</Text>
                <View style={PostHeaderStyles.locationContainer}>
                    <Image
                        source={require('../assets/icons/locationIcon.png')}
                        style={PostHeaderStyles.locationIcon}
                    />
                    <Text style={PostHeaderStyles.postLocation}>{post.location}</Text>
                </View>
            </View>
        </View>
    );
};

export default PostHeader;
