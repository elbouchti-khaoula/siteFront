import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { ChatMockApi } from 'app/mock-api/apps/chat/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
// import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
// import { TasksMockApi } from 'app/mock-api/apps/tasks/api';
import { ProjetsMockApi } from './pages/projets/api';
import { TableauAmortissementMockApi } from './pages/tableauAmortissement/api';

export const mockApiServices = [
    AuthMockApi,
    IconsMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    ChatMockApi,
    ShortcutsMockApi,
    UserMockApi,
    // ContactsMockApi,
    // TasksMockApi,
    ProjetsMockApi,
    TableauAmortissementMockApi
];
