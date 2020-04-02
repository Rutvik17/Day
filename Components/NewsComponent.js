import React, { Component } from 'react';
import {connect} from "react-redux";
import {View, StyleSheet, Image, Text, ScrollView, TouchableOpacity} from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";

class newsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.topHeadlines
            && this.props.topHeadlines.articles
            && this.props.topHeadlines.articles.length) {
            let headlines = (<View>

            </View>);
            headlines = this.props.topHeadlines.articles.map((article, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => this.props.data.navigation.navigate({routeName: 'Webview', params: {url: article.url}})}>
                        <View style={styles.headlinesView} key={index + 1}>
                            <View style={styles.articleTitleView} key={index + 2}>
                                <Text style={styles.articleTitleName} numberOfLines={4}>
                                    {article.title}
                                </Text>
                            </View>
                            <View style={styles.articleImageView} key={index + 3}>
                                <Image
                                    source={(article.urlToImage && article.urlToImage.length !== 0) ? {uri: article.urlToImage} : null}
                                    style={{width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,}}
                                />
                            </View>
                            <View style={styles.articleDescriptionView} key={index + 4}>
                                <Text style={styles.articleDescriptionText} numberOfLines={5}>
                                    {article.description}
                                </Text>
                            </View>
                            <View key={index + 5}>

                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
            return (
                <View style={styles.container}>
                    <View style={styles.topHeadlinesTitleView}>
                        <Text style={styles.heading}>
                            {'Headlines'}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.data.navigation.navigate({routeName: 'Webview', params: {url: 'https://newsapi.org/'}})}>
                            <Text style={{fontSize: 12,
                                color: Colors.brown,
                                fontFamily: Fonts.titanOne,
                                paddingLeft: 5,
                                marginLeft: 5
                            }}>
                                {'Powered by News API'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContainer}
                        horizontal={true}>
                            {headlines}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minWidth: '100%',
        maxWidth: '100%',
        borderRadius: 15,
    },
    scrollViewContainer: {
        borderRadius: 15,
        height: 'auto',
    },
    heading: {
        fontSize: 36,
        color: Colors.orange,
        fontFamily: Fonts.titanOne,
        letterSpacing: 1,
        margin: 5,
        padding: 5
    },
    headlinesView: {
        height: 450,
        width: 300,
        margin: 10,
        padding: 10,
        borderRadius: 15,
    },
    topHeadlinesTitleView: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    articleDescriptionText: {
        fontSize: 24,
        color: Colors.white,
        fontFamily: Fonts.primary,
        flexShrink: 1,
    },
    articleTitleName: {
        fontSize: 24,
        color: Colors.white,
        fontFamily: Fonts.titanOne,
    },
    articleTitleView: {
        padding: 5,
        borderRadius: 5,
    },
    articleImageView: {
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    articleDescriptionView: {
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: Colors.brown
    }
});

function mapStateToProps(state) {
    return {
        user: state.currentUser,
        topHeadlines: state.news
    }
}

export default connect(mapStateToProps)(newsComponent);