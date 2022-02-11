import {shallowMount} from '@vue/test-utils';
import ProjectUpdate from '@/components/Project/ProjectUpdate.vue';
import {routerTypes} from '@/router/routerTypes';

describe('ProjectUpdate.vue', () => {
  it('render component', () => {
    const wrapper = shallowMount(ProjectUpdate, {
      propsData: {
        projectId: 10,
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
