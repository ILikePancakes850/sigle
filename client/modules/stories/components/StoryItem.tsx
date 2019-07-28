import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { MdSettings, MdRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import format from 'date-fns/format';
import Tippy from '@tippy.js/react';
import '@reach/menu-button/styles.css';
import {
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from '../../../components';
import { getEditorRoute } from '../../../utils/routes';

const StoryItemContainer = styled.div`
  ${tw`py-4 border-b border-solid border-grey`};

  .top-container {
    ${tw`flex justify-between items-center mb-4`};
  }

  .right {
    ${tw`flex items-center`};
  }

  .title-container {
    ${tw`flex items-center`};
  }

  .title {
    ${tw`text-xl font-bold mr-2`};
  }

  .icon-container {
    ${tw`text-grey-dark`};
  }

  .edit {
    ${tw`mr-2`};
  }
`;

const StoryItemDate = styled.div`
  ${tw`text-grey-darker text-sm`};
`;

const StoryItemText = styled.div`
  ${tw`text-grey-darker text-sm truncate`};
`;

interface Props {
  story: {
    attrs: {
      _id: string;
      title?: string;
      excerpt?: string;
      createdAt?: string;
      radiksType: 'PrivateStory' | 'PublicStory';
    };
  };
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onUnPublish: (id: string) => void;
}

export const StoryItem = ({
  story,
  onDelete,
  onPublish,
  onUnPublish,
}: Props) => {
  const editorRoute = getEditorRoute({
    storyId: story.attrs._id,
    radiksType: story.attrs.radiksType,
  });

  return (
    <StoryItemContainer>
      <div className="top-container">
        <div className="left">
          <div className="title-container">
            <Link href={editorRoute.href} as={editorRoute.as}>
              <a className="title">{story.attrs.title}</a>
            </Link>
            {story.attrs.radiksType === 'PrivateStory' && (
              <Tippy
                content={'You need to publish your article to view it'}
                arrow={true}
                arrowType="round"
                theme="light-border"
              >
                <div className="icon-container">
                  <MdRemoveRedEye size={22} />
                </div>
              </Tippy>
            )}
            {story.attrs.radiksType === 'PublicStory' && (
              <Tippy
                content={'View my story'}
                arrow={true}
                arrowType="round"
                theme="light-border"
              >
                <div>
                  {/* TODO should be clickable and open the story in a new tab */}
                  <MdRemoveRedEye size={22} />
                </div>
              </Tippy>
            )}
          </div>

          {story.attrs.createdAt && (
            <StoryItemDate>
              {format(story.attrs.createdAt, 'HH:mm DD MMMM YYYY')}
            </StoryItemDate>
          )}
        </div>
        <div className="right">
          <Link href={editorRoute.href} as={editorRoute.as}>
            <Button
              color="primary"
              className="edit"
              as="a"
              style={{ cursor: 'pointer' }}
            >
              Edit
            </Button>
          </Link>

          <Menu>
            <MenuButton>
              <MdSettings size={24} />
            </MenuButton>
            <MenuList>
              {story.attrs.radiksType === 'PrivateStory' ? (
                <MenuItem onSelect={() => onPublish(story.attrs._id)}>
                  Publish
                </MenuItem>
              ) : (
                <MenuItem onSelect={() => onUnPublish(story.attrs._id)}>
                  Unpublish
                </MenuItem>
              )}
              <MenuItem
                onSelect={() => onDelete(story.attrs._id)}
                className="primary"
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <StoryItemText>{story.attrs.excerpt}</StoryItemText>
    </StoryItemContainer>
  );
};
