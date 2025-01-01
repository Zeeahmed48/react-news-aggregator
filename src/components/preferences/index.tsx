import { FC, ReactElement, useState } from 'react';
import { toast } from 'sonner';

import { Card, CheckList } from '@/components';
import { withLoader } from '@/hocs';
import { isEmptyArray } from '@/utils';

import './style.css';

const Preferences: FC<PreferencesProps> = ({
  authors,
  sources,
  categories,
  onSavePreferences
}): ReactElement => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleSavePreferences = () => {
    if (isEmptyArray(selectedSources)) {
      toast.error('Please select at least one source');
      return;
    }

    onSavePreferences({
      selectedCategories,
      selectedSources,
      selectedAuthors
    });

    toast.success('Preferences saved successfully');
  };

  return (
    <div className="preference-container">
      <h3 className="preference-title">Select your preferences</h3>
      <div className="preference-grid">
        <Card>
          <CheckList
            title="Categories"
            list={categories}
            selectedItems={selectedCategories}
            onSelectionChange={setSelectedCategories}
          />
        </Card>
        <Card>
          <CheckList
            title="News Sources"
            list={sources}
            selectedItems={selectedSources}
            onSelectionChange={setSelectedSources}
          />
        </Card>
        <Card>
          <CheckList
            title="News Authors"
            list={authors}
            selectedItems={selectedAuthors}
            onSelectionChange={setSelectedAuthors}
          />
        </Card>
      </div>
      <div className="save-btn-container">
        <button onClick={handleSavePreferences} className="save-btn">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const PreferencesWithLoader = withLoader(Preferences);

export default PreferencesWithLoader;
