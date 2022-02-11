import {shallowMount} from '@vue/test-utils';
import ProjectForm from '@/components/Project/ProjectForm.vue';
import {routerTypes} from '@/router/routerTypes';
import {ProjectFormTypeEnum, ProjectStatusEnum} from '@/service/api/types/ProjectTypes';

describe('ProjectForm.vue', () => {
  it('render component', () => {
    const wrapper = shallowMount(ProjectForm, {
      propsData: {
        value: {
          id: 0,
          name: 'test',
          sourceLanguage: 'en',
          status: ProjectStatusEnum.NEW,
          targetLanguages: ['cs'],
          dateCreated: '2022-02-11T07:16:04.299Z',
          dateUpdated: '2022-02-11T07:16:04.299Z',
          dateDue: '2022-02-11T07:16:04.299Z',
        },
        type: ProjectFormTypeEnum.CREATE,
        loading: false,
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
