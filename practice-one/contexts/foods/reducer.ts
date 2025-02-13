import { IFood } from '@types';

export type FoodsState = {
  byId: Record<string, IFood>;
  ids: string[];
};

export type FoodsAction = {
  type: 'GET_FOODS';
  payload: IFood[];
};

const normalizeData = <T extends { id: string }>(
  data: T[],
  byId: Record<string, T>,
) => {
  const ids = data.map((item) => {
    const { id } = item;

    if (byId[id]) {
      Object.assign(byId[id], item);
    } else {
      byId[id] = item;
    }

    return id;
  });

  return { ids, byId };
};

export const foodsReducer = (state: FoodsState, actions: FoodsAction) => {
  switch (actions.type) {
    case 'GET_FOODS':
      // eslint-disable-next-line no-case-declarations
      const { ids: newIds } = normalizeData(actions.payload, state.byId);
      state.ids = newIds;
      break;

    default:
      break;
  }
};
