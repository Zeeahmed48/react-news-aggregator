import { FC, ReactElement, useState } from 'react';
import { toast } from 'sonner';

import { Card, CheckList } from '@/components';
import { isEmptyArray } from '@/utils';
import { CATEGORIES, SOURCES } from '@/constants';

import './style.css';

const Preferences: FC<PreferencesProps> = ({
  onSavePreferences
}): ReactElement => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const handleSavePreferences = () => {
    if (isEmptyArray(selectedCategories)) {
      toast.error('Please select at least one category');
      return;
    }
    if (isEmptyArray(selectedSources)) {
      toast.error('Please select at least one source');
      return;
    }

    onSavePreferences({
      selectedCategories,
      selectedSources
    });

    toast.success('Preferences saved successfully');
  };

  return (
    <div className="preference-container">
      <h3 className="preference-title">Select your Preferences</h3>
      <div className="preference-grid">
        <Card>
          <CheckList
            title="Categories"
            list={CATEGORIES}
            selectedItems={selectedCategories}
            onSelectionChange={setSelectedCategories}
          />
        </Card>
        <Card>
          <CheckList
            title=" News Sources"
            list={SOURCES}
            selectedItems={selectedSources}
            onSelectionChange={setSelectedSources}
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

export default Preferences;
