import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const actions = ({docId, totalLikes, likedPhoto, handleFocus}) => {
    const {firebase, FieldValue} = useContext(FirebaseContext);
    const {uid: userId} = useContext(UserContext).user;
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);

    const handleToggleLiked = async () => {
        setToggleLiked((prevToggleLiked) => !prevToggleLiked);

        await firebase.firestore().collection('photos').doc(docId).update({
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        });

        setLikes((prevLikes) => (toggleLiked ? prevLikes - 1: prevLikes + 1));
    };

    return (
        <>
            <View style={{fledDirection: 'row', justifyContent: 'space-between', padding: 16}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={handleToggleLiked}
                        style={{
                            width: 24,
                            height: 24,
                            marginRight: 4,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <SvgIcon
                            name='heart'
                            fill={toggleLiked ? 'red' : 'none'}
                            stroke={toggleLiked ? 'red' : 'black'}
                            width={24}
                            height={24} 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleFocus}
                        style={{
                            width: 24,
                            height: 24,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <SvgIcon name='comment' fill='none' stroke='black' width={24} height={24}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{padding: 16, paddingBottom: 0}}>
                <Text style={{fontWeight: 'bold'}}>
                    {likes===1 ? `${likes} like` : `${likes} likes`}
                </Text>
            </View>
        </>
    );
}

actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
}

export default actions;