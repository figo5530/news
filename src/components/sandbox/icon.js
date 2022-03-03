import {
    UserOutlined,
    SettingOutlined,
    AuditOutlined,
    ControlOutlined,
    FileSearchOutlined,
    HomeOutlined,
    SendOutlined,
    FieldTimeOutlined,
    PaperClipOutlined,
    UserAddOutlined,
    SoundOutlined,
    SearchOutlined,
    RightCircleOutlined,
    UserSwitchOutlined,
    EditOutlined,
    ContainerOutlined,
    FolderOpenOutlined
  } from '@ant-design/icons';

  const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/right-manage": <ControlOutlined />,
    "/news-manage": <SoundOutlined />,
    "/audit-manage": <SearchOutlined />,
    "/publish-manage": <RightCircleOutlined />,
    "/user-manage/list": <UserAddOutlined />,
    "/right-manage/role/list": <UserSwitchOutlined />,
    "/right-manage/right/list": <SettingOutlined />,
    "/news-manage/news/write": <EditOutlined />,
    "/news-manage/news/draft": <ContainerOutlined />,
    "/news-manage/news/category": <FolderOpenOutlined />,
    "/audit-manage/audit/news": <FileSearchOutlined />,
    "/audit-manage/audit/list": <AuditOutlined />,
    "/publish-manage/unpublished": <FieldTimeOutlined />,
    "/publish-manage/published": <SendOutlined />,
    "/publish-manage/archived": <PaperClipOutlined />,
  }

  export default iconList