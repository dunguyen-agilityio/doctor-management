import { range } from '@/utils/array';

import Container from '../Container';
import FoodCardSkeleton from './FoodCard';

const HorizontalFoodListSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <Container flexDirection="row" gap={18} paddingLeft={20}>
      {range(length).map((idx) => (
        <FoodCardSkeleton key={idx} />
      ))}
    </Container>
  );
};

export default HorizontalFoodListSkeleton;
