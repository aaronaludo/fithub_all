import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Notification = () => {
    // Sample notification data
    const notifications = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        title: `Notification ${index + 1}`,
        description: `This is the description for notification ${index + 1}.`,
        date: new Date().toLocaleDateString(),
    }));

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate paginated data
    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const paginatedNotifications = notifications.slice(
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

    return (
        <View style={styles.container}>
            <FlatList
                data={paginatedNotifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationCard}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                )}
            />

            {/* Pagination controls */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    notificationCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#888',
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

export default Notification;
