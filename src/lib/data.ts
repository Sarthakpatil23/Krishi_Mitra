import type { User, Post, Resource, Reply } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) return { imageUrl: '', imageHint: '' };
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const users: User[] = [
  { id: 'user-1', name: 'Jane Doe', role: 'Expert', ...findImage('user-1') },
  { id: 'user-2', name: 'John Smith', role: 'Farmer', ...findImage('user-2') },
  { id: 'user-3', name: 'Emily Jones', role: 'Farmer', ...findImage('user-3') },
  { id: 'user-4', name: 'Michael Brown', role: 'Expert', ...findImage('user-4') },
];

export const replies: Reply[] = [
    {
        id: 'reply-1',
        content: "It looks like you're dealing with aphids. I'd recommend introducing ladybugs to your garden as a natural form of pest control. They are very effective.",
        author: users[0],
        createdAt: '2 days ago',
        upvotes: 15,
    },
    {
        id: 'reply-2',
        content: "I had the same issue last year. A solution of neem oil and water sprayed on the leaves worked wonders for me. Try to apply it in the evening to avoid burning the leaves.",
        author: users[2],
        createdAt: '2 days ago',
        upvotes: 8,
    },
    {
        id: 'reply-3',
        content: 'To prevent this in the future, consider planting marigolds around your tomatoes. They are known to repel many common pests.',
        author: users[3],
        createdAt: '1 day ago',
        upvotes: 5,
    },
    {
        id: 'reply-4',
        content: 'This is likely a nitrogen deficiency. You can tell by the yellowing of the older, lower leaves. I recommend a nitrogen-rich organic fertilizer.',
        author: users[0],
        createdAt: '4 hours ago',
        upvotes: 12,
    },
];

export const posts: Post[] = [
  {
    id: 'post-1',
    title: 'What are these tiny green bugs on my tomato plants?',
    content: "I've noticed a cluster of small, green insects on the underside of my tomato plant leaves. The leaves are starting to yellow and curl. Does anyone know what these are and how to get rid of them safely? I prefer organic solutions if possible. Any help would be appreciated!",
    author: users[1],
    createdAt: '3 days ago',
    tags: ['Pest Control', 'Tomatoes', 'Organic'],
    replies: [replies[0], replies[1], replies[2]],
  },
  {
    id: 'post-2',
    title: 'Corn stalks are turning yellow from the bottom up.',
    content: "My corn is about knee-high, but the lower leaves are starting to turn yellow, and it seems to be progressing up the stalk. The top leaves still look green and healthy. I've been watering regularly. Is this a nutrient deficiency or something else?",
    author: users[2],
    createdAt: '1 day ago',
    tags: ['Corn', 'Nutrient Deficiency', 'Yellowing'],
    replies: [replies[3]],
  },
  {
    id: 'post-3',
    title: 'Best irrigation method for a small vegetable garden?',
    content: "I'm setting up a new 20x20 foot vegetable garden and I'm wondering what the most efficient irrigation method would be. I've been looking at drip irrigation vs. soaker hoses. What are the pros and cons? I live in a relatively dry climate.",
    author: users[1],
    createdAt: '5 days ago',
    tags: ['Irrigation', 'Gardening', 'Water Conservation'],
    replies: [],
  },
  {
    id: 'post-4',
    title: 'Soil pH is too acidic, how to raise it?',
    content: "I tested my soil and the pH is around 5.5. I want to grow vegetables that prefer a more neutral pH (around 6.5-7.0). What's the best way to raise the soil pH? I've heard about using lime, but I'm not sure how much to apply.",
    author: users[2],
    createdAt: '1 week ago',
    tags: ['Soil Health', 'pH Level', 'Amendments'],
    replies: [],
  },
];

export const resources: Resource[] = [
    {
        id: 'res-1',
        title: 'The Ultimate Guide to Drip Irrigation',
        description: 'Learn how to set up and maintain a drip irrigation system for maximum water efficiency and healthier plants.',
        type: 'Article',
        url: '#',
        ...findImage('resource-3')
    },
    {
        id: 'res-2',
        title: 'Identifying and Treating Common Plant Diseases',
        description: 'A video tutorial on how to spot, identify, and treat common fungal and bacterial diseases in your garden.',
        type: 'Video',
        url: '#',
        ...findImage('resource-4')
    },
    {
        id: 'res-3',
        title: 'Composting for Beginners',
        description: 'This step-by-step tutorial shows you how to start your own compost pile to create nutrient-rich soil for your farm.',
        type: 'Tutorial',
        url: '#',
        ...findImage('resource-5')
    },
    {
        id: 'res-4',
        title: 'Understanding Soil pH and How to Adjust It',
        description: "An in-depth article explaining the importance of soil pH and how to test and amend your soil's acidity or alkalinity.",
        type: 'Article',
        url: '#',
        ...findImage('resource-5')
    },
    {
        id: 'res-5',
        title: 'Natural Pest Control Methods',
        description: 'Discover effective, organic ways to manage pests in your garden without resorting to chemical pesticides. A video guide.',
        type: 'Video',
        url: '#',
        ...findImage('resource-4')
    },
    {
        id: 'res-6',
        title: 'Crop Rotation Techniques for Healthy Soil',
        description: 'A tutorial on how to plan your crop rotations to prevent soil depletion and reduce pest and disease problems.',
        type: 'Tutorial',
        url: '#',
        ...findImage('resource-1')
    },
];

export const getLoginBackgroundImage = () => findImage('login-background');
