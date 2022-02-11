import {shallowMount} from '@vue/test-utils';
import ProjectStatisticCard from '@/components/Project/ProjectStatisticCard.vue';
import {routerTypes} from '@/router/routerTypes';

describe('ProjectStatisticCard.vue', () => {
  it('render component', () => {
    const wrapper = shallowMount(ProjectStatisticCard, {
      propsData: {
        value: 10,
        title: 'Test',
        description: 'Description test',
        backgroundClass: 'orange',
      },
      stubs: ['router-link'],
      mocks: {
        $t: (msg) => msg,
      },
      mixins: [
        {
          data: () => {
            return {
              routerTypes,
            };
          },
        },
      ],
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
