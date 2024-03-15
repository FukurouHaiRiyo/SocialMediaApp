import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatDistance} from 'date-fns';
import AddComment from './add-comment';

const comments = ({docId, comments: allComments, posted, commentInput}) => {
    const [comments, setComments] = useState(allComments);
    const [commentsSlice, setCommentsSlice] = useState(3);

    const showNextComments = () => {
        setCommentsSlice(commentsSlice + 3);
    };

    return (
        <>
            <View style={{padding: 16, paddingTop: 4, paddingBottom: 4}}>
                {comments.slice(0, commentsSlice).map((item, index) => (
                    <Text key={`${item.comment}-${item.displayName}`} style={{ marginBottom: 4 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.displayName}</Text>
                        <Text> {item.comment}</Text>
                    </Text>
                ))}

                {comments.length >= 3 && commentsSlice < comments.length && (
                    <TouchableOpacity style={{marginBottom: 4}} onPress={showNextComments}>
                        <Text style={{fontSize: 14, color: '#3333FF'}}>
                            View more comments
                        </Text>
                    </TouchableOpacity>
                )}

                <Text style={{ fontSize: 12, color: '#666666', textTransform: 'uppercase', marginTop: 4 }}>
                    {formatDistance(posted, new Date())} ago
                </Text>
            </View>

            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )

    comments.propTypes = {
        docId: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        posted: PropTypes.number.isRequired,
        commentInput: PropTypes.object.isRequired
    }
}

export default comments;