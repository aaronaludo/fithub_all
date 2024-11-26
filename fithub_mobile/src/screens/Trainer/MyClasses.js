import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const MyClasses = ({ navigation }) => {
    // Sample classes data
    const classes = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `Class ${index + 1}`,
        slots: `Slot ${index % 3 + 1}`,  // Example: Slot 1, Slot 2, Slot 3
        totalMembers: Math.floor(Math.random() * 30) + 10,  // Random members enrolled (10 to 40)
        startDate: new Date().toLocaleDateString(),
        description: `This is a detailed description for class ${index + 1}. The class covers various topics.`,
        image: 'https://via.placeholder.com/150',  // Placeholder image
        trainer: `Trainer ${index + 1}`,
        likes: 0,
    }));

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate paginated data
    const totalPages = Math.ceil(classes.length / itemsPerPage);
    const paginatedClasses = classes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Handle like button click
    const handleLike = (id) => {
        const updatedClasses = [...classes];
        const classIndex = updatedClasses.findIndex((item) => item.id === id);
        updatedClasses[classIndex].likes += 1;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={paginatedClasses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.classCard}>
                        <Image 
                            source={{ uri: item.image }} // Use class image
                            style={styles.classImage}
                        />
                        <Text style={styles.className}>{item.name}</Text>
                        <Text style={styles.classDetail}>Trainer: {item.trainer}</Text>
                        <Text style={styles.classDetail}>Slots: {item.slots}</Text>
                        <Text style={styles.classDetail}>Total Members Enrolled: {item.totalMembers}</Text>
                        <Text style={styles.classDetail}>Start Date: {item.startDate}</Text>
                        <Text style={styles.classDescription}>{item.description}</Text>

                        <View style={styles.likeContainer}>
                            <TouchableOpacity
                                style={styles.likeButton}
                                onPress={() => handleLike(item.id)}
                            >
                                <Text style={styles.likeButtonText}>View All</Text>
                            </TouchableOpacity>
                            <Text style={styles.likeCount}>{item.likes} Likes</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[
                        styles.pageButton,
                        currentPage === 1 && styles.disabledButton,
                    ]}
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.pageButtonText}>Previous</Text>
                </TouchableOpacity>

                <Text style={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                </Text>

                <TouchableOpacity
                    style={[
                        styles.pageButton,
                        currentPage === totalPages && styles.disabledButton,
                    ]}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.availableClassesButton} onPress={() => navigation.navigate("Trainer Available Schedule")}>
                <Text style={styles.availableClassesText}>Available Classes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    availableClassesButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 5,
    },
    availableClassesText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    classCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    classImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    classDetail: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    classDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        marginBottom: 10,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    likeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    likeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    likeCount: {
        fontSize: 14,
        color: '#333',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
    },
    pageButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pageInfo: {
        fontSize: 14,
        color: '#333',
    },
});

export default MyClasses;
