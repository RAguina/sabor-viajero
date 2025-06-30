// /app/utils/getDifficultyColor.ts 

export const getDifficultyColor = (difficulty: string) => {
  switch(difficulty) {
    case 'easy': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'hard': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};