import {shallowMount} from '@vue/test-utils';
import ProjectCreate from '@/components/Project/ProjectCreate.vue';
import {routerTypes} from '@/router/routerTypes';

describe('ProjectCreate.vue', () => {
  it('render component', () => {
    const wrapper = shallowMount(ProjectCreate, {
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
