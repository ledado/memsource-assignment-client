import {shallowMount} from '@vue/test-utils';
import ProjectDashboard from '@/components/Project/ProjectDashboard.vue';
import {routerTypes} from '@/router/routerTypes';

describe('ProjectDashboard.vue', () => {
  it('render component', () => {
    const wrapper = shallowMount(ProjectDashboard, {
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
