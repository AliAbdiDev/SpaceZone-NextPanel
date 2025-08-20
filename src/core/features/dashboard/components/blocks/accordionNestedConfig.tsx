import { ReactNode } from 'react';
import { IAccordionItem } from '@/core/components/custom/blocks/AccordionNormal';
import { HoverCardWithAvatar, HoverCardListItem } from '@/core/components/custom/blocks/HovderCardWithAvatar';
import { ButtonLink } from '@/core/components/custom/ui/Buttons';
import { validateNonEmptyArray } from '@/core/utils';

export interface LevelDataAccordionConfig {
  hoverCardListItems?: HoverCardListItem[];
  buttonName?: string;
  icon?: ReactNode;
  hrefLink?: string;
  hoverCardContent?: ReactNode;
  hoverCardAvatarSrc?: string;
  nestedLevel?: LevelDataAccordionConfig[];
  contentItems?: ReactNode;
}

export interface CourseProfileAccordionProps {
  levelOne: LevelDataAccordionConfig;
  nestedLevel?: LevelDataAccordionConfig[];
}

function nestedAccordionConfigItemsCreator(level: LevelDataAccordionConfig): IAccordionItem {
  // Build nested items array by combining hoverCard list items and nested levels
  const nestedItem: IAccordionItem['nestedItem'] = [
    // Map hoverCard list items (if any) to accordion items
    ...(validateNonEmptyArray(level.hoverCardListItems)
      ? level.hoverCardListItems.map((item) => ({
          item: {
            header: {
              title: (
                <HoverCardWithAvatar
                  triggerContent={item.title}
                  avatarSrc={level.hoverCardAvatarSrc}
                  listItems={level.hoverCardListItems}
                />
              ),
              content: (
                <div className="flex items-center justify-center gap-2">
                  <ButtonLink variant="outline" href={level.hrefLink} className="[&>svg]:size-4 [&>svg]:mt-1 ">
                    {level.icon}
                    {level.buttonName ?? 'دکمه'}
                  </ButtonLink>
                </div>
              ),
            },
          },
        }))
      : []),

    // Recursively process nested levels (if any)
    ...(validateNonEmptyArray(level.nestedLevel) ? level.nestedLevel.map(nestedAccordionConfigItemsCreator) : []),
  ];

  // Main accordion item for the current level
  return {
    item: {
      header: {
        title: validateNonEmptyArray(level.hoverCardListItems) ? (
          <HoverCardWithAvatar
            triggerContent={level.hoverCardContent}
            avatarSrc={level.hoverCardAvatarSrc}
            listItems={level.hoverCardListItems}
          />
        ) : (
          (level.hoverCardContent ?? null)
        ),
        content: (
          <div className="flex items-center justify-center gap-2">
            {level?.buttonName && (
              <ButtonLink variant="outline" href={level.hrefLink} className="[&>svg]:size-4 [&>svg]:mt-1 bg-accent/55">
                {level.icon}
                {level.buttonName}
              </ButtonLink>
            )}
          </div>
        ),
      },
      content: level?.contentItems,
    },
    nestedItem,
  };
}

const accordionNestedConfig = ({ levelOne, nestedLevel }: CourseProfileAccordionProps): IAccordionItem => {
  // Create accordion for levelOne
  const accordionItem = nestedAccordionConfigItemsCreator(levelOne);

  // Append additional nested levels if provided
  if (validateNonEmptyArray(nestedLevel)) {
    accordionItem.nestedItem = [
      ...(accordionItem?.nestedItem || []),
      ...nestedLevel.map(nestedAccordionConfigItemsCreator),
    ];
  }

  return accordionItem;
};

export default accordionNestedConfig;
