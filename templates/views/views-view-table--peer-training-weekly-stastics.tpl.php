<?php

/**
 * @file
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $caption: The caption for this table. May be empty.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */

<<<<<<< HEAD
function _missedSession($username, $bypassed, $attended, $cancelled){
 if($bypassed) return $bypassed;
 if($username && !$attended && !$cancelled) return 'Missed';
 return '';
}
function _p_kv($arr, $k){
 print $k.': <b>'.$arr.'</b><br />';
}

$nid; $rowsSorted = array(); $nodeCount; $userCount; $attendanceCount; $cancelCount; $confirmedCount; $totalFeedback; $missedCount; $availableCount = array('O' => 0, 'X' => '0'); $dates = array(); $times = array(); $trainers = array();
foreach($rows as $rowCount => &$pRow){
$nid = $pRow['nid'];
if(array_key_exists($nid, $rowsSorted)){

	$userCount = $userCount + ($pRow['user_email'] ? 1 : 0);
	$rowsSorted[$nid]['user_email'] .= '<br />'.$pRow['user_email'];

	$attendanceCount = $attendanceCount + ($pRow['attended'] ? 1 : 0);
	$rowsSorted[$nid]['attended'] .= '<br />'.$pRow['attended'];

	$cancelCount = $cancelCount + ($pRow['cancelled'] ? 1 : 0);
	$rowsSorted[$nid]['cancelled'] .= '<br />'.$pRow['cancelled'];

	$missedInfo = _missedSession($pRow['user_email'], $pRow['bypassed'], $pRow['attended'],$pRow['cancelled']);
	$missedCount = $missedCount + ($missedInfo ? 1 : 0);
	$rowsSorted[$nid]['bypassed'] = '<br />'.$missedInfo;

	$confirmedCount = $confirmedCount + ($pRow['confirmed'] ? 1 : 0);
	$rowsSorted[$nid]['confirmed'] .= '<br />'.$pRow['confirmed'];
}else{

	$rowsSorted[$nid]['nid'] = $pRow['nid'];

	$sDate = strip_tags($pRow['field_date_1']);
	$rowsSorted[$nid]['field_date_1'] = $sDate;
	$sDate = explode(' ', $sDate)[0];
	if(array_key_exists($sDate, $dates)) $dates[$sDate]++; else $dates[$sDate] = 1;

	$sTime = strip_tags($pRow['field_date']);
	$rowsSorted[$nid]['field_date'] = $sTime;
	$sTime = str_replace(':00', '', $sTime);
	if(array_key_exists($sTime, $times)) $times[$sTime]++; else $times[$sTime] = 1;


	$sTrainer = $pRow['title'];
	$rowsSorted[$nid]['title'] = $sTrainer;
	$sTrainer = explode(' ', $sTrainer)[0];
	if(array_key_exists($sTrainer, $trainers)) $trainers[$sTrainer]++; else $trainers[$sTrainer] = 1;

	$avalInfo = $pRow['registration_available_slots'] ? 'O' : 'X';
	$avalInfo == 'O' ? $availableCount['O']++ : $availableCount['X']++;
	$rowsSorted[$nid]['registration_available_slots'] = $avalInfo;

	$userCount = $userCount + ($pRow['user_email'] ? 1 : 0);
	$rowsSorted[$nid]['user_email'] = $pRow['user_email'];

	$attendanceCount = $attendanceCount + ($pRow['attended'] ? 1 : 0);
	$rowsSorted[$nid]['attended'] = $pRow['attended'];

	$cancelCount = $cancelCount + ($pRow['cancelled'] ? 1 : 0);
	$rowsSorted[$nid]['cancelled'] = $pRow['cancelled'];

	$missedInfo = _missedSession($pRow['user_email'], $pRow['bypassed'], $pRow['attended'],$pRow['cancelled']);
	$missedCount = $missedCount + ($missedInfo ? 1 : 0);
	$rowsSorted[$nid]['bypassed'] = $missedInfo;

	$confirmedCount = $confirmedCount + ($pRow['confirmed'] ? 1 : 0);
	$rowsSorted[$nid]['confirmed'] = $pRow['confirmed'];

	$totalFeedback = $totalFeedback + $pRow['comment_count'];
	$rowsSorted[$nid]['comment_count'] = $pRow['comment_count'];
	$rowsSorted[$nid]['views_conditional'] = $pRow['views_conditional'];

	$nodeCount++;
}
}

=======
 $nid; $rowsSorted = array(); $nodeCount; $userCount; $attendanceCount; $cancelCount; $confirmedCount; $totalFeedback;
 foreach($rows as $rowCount => &$pRow){
	$nid = $pRow['nid'];
  if(array_key_exists($nid, $rowsSorted)){

		$userCount = $userCount + ($pRow['user_email'] ? 1 : 0);
		$rowsSorted[$nid]['user_email'] .= '<br />'.$pRow['user_email'];

		$attendanceCount = $attendanceCount + ($pRow['attended'] ? 1 : 0);
		$rowsSorted[$nid]['attended'] .= '<br />'.$pRow['attended'];

		$cancelCount = $cancelCount + ($pRow['cancelled'] ? 1 : 0);
		$rowsSorted[$nid]['cancelled'] .= '<br />'.$pRow['cancelled'];

		$rowsSorted[$nid]['bypassed'] .= '<br />'.$pRow['bypassed'];
		$rowsSorted[$nid]['nothing_1'] .= '<br />'.$pRow['nothing_1'];

		$confirmedCount = $confirmedCount + ($pRow['confirmed'] ? 1 : 0);
		$rowsSorted[$nid]['confirmed'] .= '<br />'.$pRow['confirmed'];
	}else{
		$rowsSorted[$nid]['nid'] = $pRow['nid'];
		$rowsSorted[$nid]['field_date_1'] = $pRow['field_date_1'];
		$rowsSorted[$nid]['field_date'] = $pRow['field_date'];
		$rowsSorted[$nid]['title'] = $pRow['title'];
		$rowsSorted[$nid]['registration_available_slots'] = $pRow['registration_available_slots'] ? 'Available' : 'No';

		$userCount = $userCount + ($pRow['user_email'] ? 1 : 0);
		$rowsSorted[$nid]['user_email'] = $pRow['user_email'];

		$attendanceCount = $attendanceCount + ($pRow['attended'] ? 1 : 0);
		$rowsSorted[$nid]['attended'] = $pRow['attended'];

		$cancelCount = $cancelCount + ($pRow['cancelled'] ? 1 : 0);
		$rowsSorted[$nid]['cancelled'] = $pRow['cancelled'];

		$rowsSorted[$nid]['bypassed'] = $pRow['bypassed'];
		$rowsSorted[$nid]['nothing_1'] = $pRow['nothing_1'];

		$confirmedCount = $confirmedCount + ($pRow['confirmed'] ? 1 : 0);
		$rowsSorted[$nid]['confirmed'] = $pRow['confirmed'];

		$totalFeedback = $totalFeedback + $pRow['comment_count'];
		$rowsSorted[$nid]['comment_count'] = $pRow['comment_count'];
		$rowsSorted[$nid]['views_conditional'] = $pRow['views_conditional'];

		$nodeCount++;
	}
 }

 //dsm($rows);
 dsm($rowsSorted);
>>>>>>> 0f48824fe57ce6a962daa58a5d1fa8dbe93791e6
?>
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?>>
            <?php print $label; ?>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rowsSorted as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php foreach ($row as $field => $content): ?>

        	<?php
	        	if($row['matched']){
		        	//dsm($field);
	        	}
	        ?>

          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $content; ?>
          </td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
			<tr class="totalRow">
<<<<<<< HEAD
				<td class="totalCol col-1"><b><?php print $nodeCount; ?></b> (Sessions)</td>
				<td class="totalCol col-2"><?php array_walk($dates, "_p_kv"); ?></td>
				<td class="totalCol col-3"><?php array_walk($times, "_p_kv"); ?></td>
				<td class="totalCol col-4"><?php array_walk($trainers, "_p_kv"); ?></td>
				<td class="totalCol col-5"><b><?php print $availableCount['O']; ?></b> (Available)<br /><b><?php print $availableCount['X']; ?></b> (Used)</td>
				<td class="totalCol col-6"><b><?php print $userCount; ?></b> (Users)</td>
				<td class="totalCol col-7"><b><?php print $attendanceCount; ?></b> (Attended)</td>
				<td class="totalCol col-8"><b><?php print $cancelCount; ?></b> (Cancelled)</td>
				<td class="totalCol col-9"><b><?php print $missedCount; ?></b> (Missed)</td>
				<td class="totalCol col-10"><b><?php print $confirmedCount; ?></b> (Confirmed)</td>
				<td class="totalCol col-11"><b><?php print $totalFeedback; ?></b> (Feedback)</td>
				<td class="totalCol col-12"><b><?php print round(($availableCount['X'] / $nodeCount) * 100, 1) ?>%</b> (Used/Sessions)</td>
=======
				<td class="totalCol col-1"><b><?php print $nodeCount; ?></b> (Session Count)</td>
				<td class="totalCol col-2"></td>
				<td class="totalCol col-3"></td>
				<td class="totalCol col-4"></td>
				<td class="totalCol col-5"></td>
				<td class="totalCol col-6"><b><?php print $userCount; ?></b> (All Users)</td>
				<td class="totalCol col-7"><b><?php print $attendanceCount; ?></b> (Total Attended)</td>
				<td class="totalCol col-8"><b><?php print $cancelCount; ?></b> (Total Cancelled)</td>
				<td class="totalCol col-9"></td>
				<td class="totalCol col-10"></td>
				<td class="totalCol col-11"><b><?php print $confirmedCount; ?></b> (Total Confirmed)</td>
				<td class="totalCol col-12"><b><?php print $totalFeedback; ?></b> (Total Feedback)</td>
				<td class="totalCol col-13"></td>
>>>>>>> 0f48824fe57ce6a962daa58a5d1fa8dbe93791e6

  </tbody>
</table>
